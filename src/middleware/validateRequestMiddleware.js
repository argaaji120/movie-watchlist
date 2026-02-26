export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        // If validation fails
        if (!result.success) {
            // const formatted = result.error.format();
            // const flatErrors = Object.values(formatted)
            //     .flat()
            //     .filter(Boolean)
            //     .map((err) => err._errors)
            //     .flat();

            // return res.status(400).json({ message: flatErrors.join(", ") });

            // Other approach
            // Get all error messages in a simple way
            const errors = result.error.issues.map((issue) => issue.message);

            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        next();
    };
};
