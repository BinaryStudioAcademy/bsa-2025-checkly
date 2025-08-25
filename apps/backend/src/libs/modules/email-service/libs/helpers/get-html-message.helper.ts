const getHtmlMessage = (link: string): string => {
	return `<p>To change your password, please follow the link:</p><a href="${link}">Reset Password</a>`;
};

export { getHtmlMessage };
