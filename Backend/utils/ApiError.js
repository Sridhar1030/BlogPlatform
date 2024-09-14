const errorHandler = (err, req, res, next) => {
	console.log("error"); 
	res.status(err.status || 500).json({
		message: err.message || "An unexpected error occurred",
	});
};

export default errorHandler;
