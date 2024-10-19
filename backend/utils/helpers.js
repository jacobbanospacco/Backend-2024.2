exports.isValidDomain = (email, domain) => {
    return email.endsWith(`@${domain}`);
  };
  