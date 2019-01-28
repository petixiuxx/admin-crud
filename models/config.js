const ConfigModel = (sequelize, type) => {
    return sequelize.define('config', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        data: type.STRING 
    })
};

export default ConfigModel;