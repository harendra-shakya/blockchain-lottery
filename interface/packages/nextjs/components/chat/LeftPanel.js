const LeftPanel = ({ sender, onSignOut }) => (
    <>
        <div className="bg-purple-100 shadow-md h-64 flex flex-col justify-center items-center rounded-md">
            <div className="h-24 w-24 mb-3">
                <img className="rounded-full" src="https://peterbe.com/avatar.random.png" />
            </div>
            <p className="text-purple-500">
                Hello, <span className="font-semibold">{sender}</span>
            </p>
            <div className="mt-4">
                <button onClick={onSignOut} className="text-white bg-purple-500 px-5 text-xs py-3 rounded-md w-full">
                    Sign out
                </button>
            </div>
        </div>

        <div className="mt-10">
            <h2 className="text-green-600">You're online.</h2>
        </div>
    </>
);

export default LeftPanel;
