const express = require('express');
const router = express.Router();
const pool = require('../startup/database');
const logger = require('../helpers/logger');

router.get('/', (req, res) => {
    pool.connect()
    .then(client =>{
        client.query('SELECT * FROM posts')
        .then(resp => {
            logger.log()
            logger.log('info', resp.rows);
            res.send(resp.rows);
        })
        .catch(err => {
            logger.log('error', err);
            res.status(400).send("Client error " + err);
        });
    })
    .catch(err => {        
        logger.log('error', err);
        res.status(400).send("Pool error " + err);
    });
});

router.get('/:id', (req,res) => {
    pool.connect()
    .then(client => {
        client.query('SELECT * FROM posts WHERE id=$1', [req.params.id])
        .then(resp => {
            logger.log(resp.rows);
            res.send(resp.rows);
        })
        .catch(err => {
            logger.log('error', err);
            res.status(400).send("Client error " + err);
        });
    })
    .catch(err => {
        logger.log('error', err);
        res.status(400).send("Pool error " + err);
    })
});

router.post('/', (req, res) => {    
    pool.connect()
    .then(client => {
        client.query('SELECT * FROM posts WHERE title = $1 AND redditor = $2 AND url = $3', [req.body.title, req.body.redditor, req.body.url])
        .then(resp => {
            if (resp.rowCount>0) {
                logger.log('warn', 'Item already exists! id: ' + resp.rows[0].id);

                client.query('UPDATE posts SET score = $4 WHERE title = $1 AND redditor = $2 AND url = $3', [req.body.title, req.body.redditor, req.body.url, req.body.score])
                .then(response => {
                    res.send(response.rows);
                })
                .catch(err => {
                    logger.log('error', err);
                    res.status(400).send("UPDATE error " + err);
                });                
            } else {
                client.query('INSERT INTO posts (title, redditor, score, url, imgtitle, createdat) VALUES($1, $2, $3, $4, $5, $6);', [req.body.title, req.body.redditor, req.body.score,  req.body.url, req.body.imgtitle, req.body.createdat])
                .then(response => {
                    res.send(response.rows);
                })
                .catch(err => {
                    logger.log('error', err);
                    res.status(400).send('INSERT error ' + err);
                })
            }
        })
        .catch(err => {
            logger.log('error', err);
            res.status(400).send("Client error " + err);
        })
    })
    .catch(err => {
        logger.log('error', err);
        res.status(400).send('Pool error ' + err);
    })
})

module.exports = router;