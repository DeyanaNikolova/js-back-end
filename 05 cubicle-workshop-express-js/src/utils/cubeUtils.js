exports.generateDifficultyLevels = function(currentLevel) {
  
    const difficultiLevels = [
      {key: 1, label: 'Very Easy', selected: false},
      { key: 2, label: 'Easy', selected: false},
      { key: 3, label: 'Medium (Standard 3x3)', selected: false},
      { key: 4, label: 'Intermediate', selected: false},
      { key: 5, label: 'Expert', selected: false},
      { key: 6, label: 'Hardcore', selected: false}
    ];
  
    const result = difficultiLevels.map(x => x.key === currentLevel ? { ...x, selected: true } : x);
  
    return result;
  };

  exports.isOwner = function (user, cube) {
    return cube.owner == user._id;
  }