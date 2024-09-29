const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(res, req,next)).catch((err) => next(err))
    }
}

export{asyncHandler}

// const asyncHandler = ()=> {}
// const asyncHandler = (fn) => () =>{}
// const asyncHandler = (fn) => async() => {} --- This is the method for async function


// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message: err.message
//         })
//     }
// }