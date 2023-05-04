# Task 3: Evil-Question-NodeJS (JavaScript)

- Lacking an error handler, rejecting the Promise results in an Uncaught Promise error
- The Promise is already rejected when `.then` and `.catch` are called on it
    -> Thus, when calling `_promise.then(...)`, the callback will not be invoked
    -> Instead, an error handler is searched, which doesn't exist
    -> Another identical Uncaught Promise Error
- When calling `_promise.catch(...)`, finally an error handler is attached
    -> Thus, the callback (in this case `console.log`) is called with the 'BOOOM' error
    -> We see the error printed
- To be honest, right now I'm unable to explain why the stacktrace is missing at the end
    -> Either I'm wrong or console.log behaves differently depending on its calling side