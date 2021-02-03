
const models = require('../../models');
var axios = require("axios").default;

exports.getUserMe = async (req, res, next) => {
    // console.log(req.body)
    const id = req.body.userId;
    const data = await models.User.findOne({
        include: {
            model: models.Profile
        },
        where: { id: id }
    });

    return res.status(200).json({
        user: data
    });
}

function makeid(length) {
    var result = '';
    var characters = '0123456789098765432101234567890987654321';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.sendVerificationCode = async (phoneNumber, models) => {
    const confirmationCode = makeid(6);
    var options = {
        method: 'POST',
        url: 'https://www.easysendsms.com/sms/bulksms-api/bulksms-api',
        params: {
            username: 'danbdana2019',
            password: 'esm702',
            from: 'SOS-MAMAS',
            to: phoneNumber,
            text: 'Votre code de confirmartion est: ' + confirmationCode
        },
    }

    const data = await axios.request(options).then(function (response) {
        models.OtpVerification.create({
            credetial: response.data,
            phoneNumber: phoneNumber,
            otpCode: confirmationCode
        });
        return {
            credetial: response.data,
            isVerifed: true
        }
    }).catch(function (error) {
        return {
            credetial: null,
            isVerifed: false
        }
    });
    return data
}