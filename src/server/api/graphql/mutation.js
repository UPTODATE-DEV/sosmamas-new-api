const { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT } = require('./constants');
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = ({
    async createPeriode(root, { name }, { models }) {
        let newPeriode = models.Periode.create({ name: name });
        pubsub.publish(NEW_PERIODE, { newPeriode });
        return newPeriode;
    },
    async createConseil(root, { title, name, periodeId }, { models }) {
        return models.Conseil.create({ title: title, name: name, periodeId: periodeId });
    },
    async createSymptome(root, { title, name, periodeId }, { models }) {
        return models.Symptome.create({ title: title, name: name, periodeId: periodeId });
    },
    async createPostCategory(root, { name }, { models }) {
        return models.PostCategory.create({ id: uniqid(''), name: name });
    },
    async createPost(root, { title, content, categoryId }, req, { models }) {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        let newPost = models.Post.create({ id: uniqid(''), title: title, content: content, categoryId: categoryId });
        pubsub.publish(NEW_POST, { newPost });
        return newPost;
    },
    async createComment(root, { postId, content }, { models }) {
        let newComment = models.Comment.create({ id: uniqid(''), content: content, postId: postId });
        pubsub.publish(NEW_COMMENT, { newComment });
        return newComment;
    },
    async createUser(root, { username, email, password }, { models }) {

        const existingUser = await models.User.findOne({ where: { email: email } });
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = models.User.create({
            id: uniqid(''),
            username: username,
            email: email,
            password: hashedPassword
        });

        return user;

    },
    async login(root, { email, password }, { models }) {
        const user = await models.User.findOne({ email: email });
        // if (!user) {
        //     throw new Error('User does not exist!');
        // }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'somesupersecretkey',
            {
                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
    },
})