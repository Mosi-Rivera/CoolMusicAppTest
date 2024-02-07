const Container = ({children}: any) => {
    return <div className="min-h-screen max-h-screen overflow-y-hidden w-screen bg-grey-600">
        {children}
    </div>
}

export default Container;