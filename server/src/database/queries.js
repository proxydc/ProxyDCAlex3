//queries reg accounts
const getAccounts = "select a.*, r.role_name from account a, role r where a.role_id = r.id order by a.id asc";
const getAccountById = "select * from account where id = $1";
const checkLoginExists = "select a from account a where a.login_name = $1";
const addAccount = "insert into account(login_name, display_name, pass_word, role_id) values ($1, $2, $3, $4)";
const updateAccount ="update account set display_name = $2, pass_word = $3, role_id = $4 where id = $1";
const deleteAccountById = "delete from account where id = $1";
const getAuthentification = "select * from account a where a.login_name = $1 and a.pass_word = $2";

//queries reg DCS
const getDCs = "select * from dc";
const getDCById = "select * from dc where id = $1";
const checkDCExists = "select a from dc a where a.familyname = $1 and a.firstname = $2";
const addDC = "insert into dc(familyname, firstname, email, dc_status, document) values ($1, $2, $3, $4, $5)";
const updateDC ="update dc set tags = $2, document = $3 where id = $1";
const deleteDCById = "delete from dc where id = $1";



module.exports = {
    getAuthentification,
    getAccounts,
    getAccountById,
    checkLoginExists,
    addAccount,
    updateAccount,
    deleteAccountById, 
    
    getDCs,
    getDCById,
    checkDCExists,
    addDC,
    updateDC,
    deleteDCById,


};