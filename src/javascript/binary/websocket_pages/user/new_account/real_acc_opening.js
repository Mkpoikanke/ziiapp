const Client         = require('../../../base/client').Client;
const AccountOpening = require('../../../common_functions/account_opening');
const FormManager    = require('../../../common_functions/form_manager');

const RealAccOpening = (function() {
    'use strict';


    const onLoad = () => {
        if (AccountOpening.redirectCookie()) return;

        if (Client.get('residence')) {
            if (AccountOpening.redirectAccount()) return;

            const formID = '#frm_real';
            AccountOpening.populateForm(formID, AccountOpening.commonValidations);
            FormManager.handleSubmit(formID, { new_account_real: 1 }, handleResponse);
        }
    };

    const handleResponse = response => (AccountOpening.handleNewAccount(response, response.msg_type));

    return {
        onLoad: onLoad,
    };
})();

module.exports = RealAccOpening;
