const DELETETODOS = 'deletetodos';
const LISTTODOS = 'listtodos';

export const deletetodos = () => ({
    type: DELETETODOS
})

export const listtodos = () => ({
    type: LISTTODOS
})


const initialState = {
    todos: null

}

export default (state = initialState, action) => {
    switch(action.type) {
      case DELETETODOS:
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
  
            setTodos(jsonData.rows);
        
      } catch (err) {
        console.error(err.message);
      }
    };
        return {...state,count: state.count+1};
      case LISTTODOS:
        return {...state,count: state.count-1};  
      default:
        return state;
  
    }
  }

