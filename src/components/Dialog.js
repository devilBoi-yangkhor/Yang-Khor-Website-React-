export default function AlertDialog({message}){
    return (
        <div className="alert alert-warning" role="alert">
            {message}
        </div>
    )
}