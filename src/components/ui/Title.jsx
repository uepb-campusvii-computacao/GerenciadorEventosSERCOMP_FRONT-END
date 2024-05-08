import PropTypes from 'prop-types'

const Title = ({title}) => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mt-5 mb-5">{title}</h1>
    </div>
  )
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title
