const QuizzModel = (sequelize, type) => {
    return sequelize.define('quizz', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        detail: type.STRING,
        subQuestion: type.STRING,
        data: type.STRING
    })
};

export default QuizzModel;