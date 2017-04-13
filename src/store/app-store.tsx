import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import DevTools from '../containers/devtools';
import charactersReducer from '../reducers/characters-reducers';
import spellsReducer from '../reducers/spells-reducers';
import spellEditReducer from '../reducers/spell-edit-reducer';
import skillsReducer from '../reducers/skills-reducers';
import authReducer from '../reducers/auth-reducers';

// import { reducer as searchReducer, reduxSearch } from 'redux-search';

// Had to modify typings redux-logger. Used "export default createLogger"
// https://github.com/theaqua/redux-logger/issues/89
// See https://github.com/Microsoft/TypeScript/issues/5565
// import * as createLogger from "redux-logger";
// // import * as createLogger from 'redux-logger';
// // import { createLogger } from "redux-logger";
// // import createLogger = require('redux-logger');

// // const loggerMiddleware = (createLogger as any)();

// const loggerMiddleware = (createLogger as any)({
//     level: 'info',
//     collapsed: true
// });

export default function appStore(initialState) {
    const store = createStore(
        combineReducers({
            characters: charactersReducer,
            spells: spellsReducer,
            spellEdit: spellEditReducer,
            skills: skillsReducer,
            auth: authReducer
        }),
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, apiMiddleware)
            //DevTools.instrument()
        )
    );

    //   if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //       const nextRootReducer = require('../reducers').default
    //       store.replaceReducer(nextRootReducer)
    //     })
    //   }
    // const store = finalCreateStore(spellsReducer, initialState);
    // const store = finalCreateStore(rootReducer, initialState);
    return store;
}
