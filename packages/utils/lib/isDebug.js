const isDebug = () => process.argv.includes('--debug') || process.argv.includes('-d');
export default isDebug;