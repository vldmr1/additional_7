module.exports = function solveSudoku(matrix) {

  const isComplete = (matrix) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrix[y][x] === 0) {
          return false;
        }
      }
    }
    return true;
  } 

  const findOptions = (matrix, i, j) => {
    const options = {};
    for (let a = 1; a < 10; a++) {
     options[a] = 0;
    }

    for (let y = 0; y < 9; y++) {
      if (matrix[y][j] !== 0) {
        options[matrix[y][j]] = 1;
      }
    }
    
    for (let x = 0; x < 9; x++) {
      if (matrix[i][x] !== 0) {
        options[matrix[i][x]] = 1;
      }
    }
    
    let k = 0,
        l = 0;

    if (i>= 0 && i <= 2) {
      k = 0; 
    } else if (i >= 3 && i <= 5) {
     k = 3;    
    } else {
      k = 6;
    }

    if (j >=0 && j <= 2) {
      l = 0; 
    } else if (j >= 3 && j <= 5) {
      l = 3;    
    } else {
      l = 6;
    }
  
    for (let y = k; y < (k + 3); y++) {
      for (let x = l; x < (l + 3); x++) {
        if (matrix[y][x] !== 0) {
          options[matrix[y][x]] = 1; 
        }
      }
    }
  
    for (let a = 1; a < 10; a++) {
      if (options[a] === 0) {
        options[a] = a;
      } else {
        options[a] = 0;
      }
    }
    return options;
  }
  
  const solution = (matrix) => {
    let i,
        j,
        options = {};       

    if (isComplete(matrix)) {
      return matrix;
      
    } else {
      loop:
        for (let y = 0; y < 9; y++) {
          for (let x = 0; x < 9; x++) {
            if (matrix[y][x] === 0) {
              i = y;
              j = x;
              break loop;
            }
          }
        }
      options = findOptions(matrix, i, j);

      let trigger = true; 
        for (let a = 1; a < 10; a++) {
          if (options[a]) {
            trigger = false;
            matrix[i][j] = options[a];
            let output = solution(matrix);
            if (output) {
             return output;
            }
          }
          matrix[i][j] = 0;  
        }
      if (trigger) {
        return false;    
      }
    }
  }
  return solution(matrix);
}