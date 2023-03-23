const router = require('express').Router();
const Post = require("../models/posts");

router.get('/', async (_, res, next) => {
    const all = await Post.findAll();
    return res.status(200).json(all);
});

router.post('/', async (req, res, next) => {
    const { name, description } = req.body;
    const newPost = await Post.create({
        name,
        description,
    });
    return res.status(201).json(newPost);
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const postToDelete = await Post.findByPk(id);
    await postToDelete.destroy();
    return res.status(200).json(postToDelete);
});

module.exports = router;