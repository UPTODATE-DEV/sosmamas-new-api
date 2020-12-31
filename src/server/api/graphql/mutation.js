require('dotenv').config();
const { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT } = require('./constants');
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = ({
    async createPeriode(_, { name }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        let newPeriode = models.Periode.create({ name: name });
        pubsub.publish(NEW_PERIODE, { newPeriode });
        return newPeriode;
    },
    async createConseil(_, { title, name, periodeId }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Conseil.create({ title: title, name: name, periodeId: periodeId });
    },
    async createSymptome(_, { title, name, periodeId }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Symptome.create({ title: title, name: name, periodeId: periodeId });
    },
    async createPostTag(_, { name }, { user, models }) {
        // if (!user) {
        //     throw new Error('Unauthenticated!');
        // }
        return models.PostTag.create({ id: uniqid(''), name: name });
    },
    async createPost(_, { title, body, tagId }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        let newPost = models.Post.create({ id: uniqid(''), title: title, body: body, tagId: tagId, authorId: user.userId });
        pubsub.publish(NEW_POST, { newPost });
        return newPost;
    },
    async createComment(_, { postId, content }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        let newComment = models.Comment.create({ id: uniqid(''), content: content, postId: postId, userId: user.userId });
        pubsub.publish(NEW_COMMENT, { newComment: newComment });
        return newComment;
    },
    async profile(_, args, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return await models.Profile.findOrCreate({
            where: { userId: args.userId },
            args
        }).then(([result, created]) => {
            console.log(created);
            if (created) {
                return created;
            } else {
                const update = result.update(
                    args,
                    { where: { userId: user.userId } }
                );
                return update;
            }
        });
    },
    async createUser(_, args, { models }) {

        const existingUser = await models.User.findOne({ where: { phone: args.phone } });
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.password, 12);

        const user = models.User.create({
            id: uniqid(''),
            phone: args.phone,
            password: hashedPassword
        });

        return user;

    },
    async login(_, { phone, password }, { models }) {
        const user = await models.User.findOne({ where: { phone: phone } });

        if (user !== null) {
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign(
                { userId: user.id, phone: user.phone },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: '1h'
                }
            );
            return { userId: user.id, token: token, tokenExpiration: 1 };
        }
        throw new Error('User doesn\'t exist!');
    },
    async uploadFile(_, { file }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        const {createReadStream, filename, mimetype, encoding} = await file;
        const stream = createReadStream();
        const pathName = path.basename.apply.join(__dirname, `/public/storage/images/$fileName`);
        await stream.pipe(fs.createWriteStream(pathName));

        return {
            url: `http://localhost:4000/images/$fileName`
        };
    },
})