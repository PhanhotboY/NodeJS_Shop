const helpers = {
    when: function (operand_1, operator, operand_2, options) {
        var operators = {
            eq: function (l, r) {
                return l == r;
            },
            noteq: function (l, r) {
                return l != r;
            },
            gt: function (l, r) {
                return Number(l) > Number(r);
            },
            or: function (l, r) {
                return l || r;
            },
            and: function (l, r) {
                return l && r;
            },
        };
        let result = operators[operator](operand_1, operand_2);

        if (result) return options.fn(this);
        else return options.inverse(this);
    },

    toNumberString: (number) => {
        number = Number(number);
        if (!number || number < 0) {
            return 0;
        }
        let numberString = '';

        while (number > 0) {
            numberString = number
                .toString()
                .slice(-3)
                .concat(`${numberString !== '' ? '.' + numberString : ''}`);
            number = Math.floor(number / 1000);
        }
        return numberString;
    },

    getDiscountPrice: (originPrice, discount) => {
        let discountedPrice =
            (originPrice *
                Number(100 - discount.toString().trim().slice(0, -1))) /
            100;

        return discountedPrice;
    },

    changeUnit: (number) => {
        number = Number(number);

        if (number < 1000) return number;

        number = (Math.floor(10 * (number / 1000)) / 10).toString().concat('k');

        return number;
    },
};

module.exports = helpers;
