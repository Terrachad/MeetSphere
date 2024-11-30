

const Meeting = ({params} : {params:{id: string}}) => {

  return (
     <p>Meeting room #{params.id}</p>
  )
}

export default Meeting