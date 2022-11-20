const express = require('express');
const bodyParser = require('body-parser');

const LeadersRouter = express.Router();

LeadersRouter.use(bodyParser.json());

LeadersRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((Leaders) => {
        console.log('Leaders Created ', Leaders);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

LeadersRouter.route('/:LeadersId')
.get((req,res,next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Leaders/'+ req.params.LeadersId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.LeadersId, {
        $set: req.body
    }, { new: true })
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.LeadersId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

LeadersRouter.route('/:LeadersId/comments')
.get((req,res,next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Leaders.comments);
        }
        else {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null) {
            Leaders.comments.push(req.body);
            Leaders.save()
            .then((Leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Leaders);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders/'
        + req.params.LeadersId + '/comments');
})
.delete((req, res, next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null) {
            for (var i = (Leaders.comments.length -1); i >= 0; i--) {
                Leaders.comments.id(Leaders.comments[i]._id).remove();
            }
            Leaders.save()
            .then((Leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Leaders);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

LeadersRouter.route('/:LeadersId/comments/:commentId')
.get((req,res,next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null && Leaders.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Leaders.comments.id(req.params.commentId));
        }
        else if (Leaders == null) {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Leaders/'+ req.params.LeadersId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null && Leaders.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                Leaders.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                Leaders.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            Leaders.save()
            .then((Leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Leaders);                
            }, (err) => next(err));
        }
        else if (Leaders == null) {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findById(req.params.LeadersId)
    .then((Leaders) => {
        if (Leaders != null && Leaders.comments.id(req.params.commentId) != null) {
            Leaders.comments.id(req.params.commentId).remove();
            Leaders.save()
            .then((Leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Leaders);                
            }, (err) => next(err));
        }
        else if (Leaders == null) {
            err = new Error('Leaders ' + req.params.LeadersId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = LeadersRouter;
