const AdminModel = (sequelize, type) => {
    return sequelize.define('admin', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        username: type.STRING,
        password: type.STRING
    })
};

export default AdminModel;