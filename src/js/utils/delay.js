import restArguments from './restArguments'

export default restArguments((func, wait, args) => setTimeout(() => func.apply(null, args), wait))
