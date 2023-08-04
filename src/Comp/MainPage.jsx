export default function MainPage({children}){
    return(
        <>
        <div className="container" style={{marginTop:70}}>
        <div className="row">
           {children}
        </div>
       </div>
        </>
    )
}