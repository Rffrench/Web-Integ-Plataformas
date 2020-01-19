module.exports= {
    user          : process.env.NODE_ORACLEDB_USER || "okcasa",
	password      : process.env.NODE_ORACLEDB_PASSWORD || "123",
	connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=okcasa.cr7hj31wtehr.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))",
	externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
}