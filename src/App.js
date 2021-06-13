// TODO
// Fixable
// Prompt user to delete when checkbox checked (through message? form? idk)
// Fill form func on form compoenent?
// Override mui with custom theme (esp for typography)
// Fix styling (material ui and drag and drop clashes)
// Add arrow to indicate scrollable div
// Add POST request for rearranged list
// Add warning when no user input on addTask

import Auth from './pages/Auth'
import Tasks from './pages/Tasks'
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'


function App() {


    // Try to do it with isProtected routes


    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isProtected, setIsProtected] = useState(true);

    console.log("app reloaded")

    return (
      <Switch>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    )
}

export default App;