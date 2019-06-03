module.exports = function define<%= name %>(sequelize, DataTypes) {
  const <%= name %> = sequelize.define('<%= name %>', {
    <% Object.keys(attributes).forEach(function(fieldName, index) { %>
      <%= fieldName %>: DataTypes.<%= attributes[fieldName].toUpperCase() %>,
    <% }) %>
  });

  <%= name %>.associate = function associate(models) {
    // associations can be defined here
  };

  return <%= name %>;
};
