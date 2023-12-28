const VendorSign = () => {
    return (
        <div
            id="VendorSignUpOneRoot"
            className="overflow-hidden bg-[#355b2b] relative flex flex-col justify-end gap-10 w-full font-['Gilroy-Medium'] items-start pt-40 pb-12"
        >
            <div className="relative flex flex-col ml-32 gap-6 w-1/3 items-start">
                <div
                    id="WelcomeToJunkBazar1"
                    className="text-5xl font-['Poppins'] font-semibold leading-[68px] text-white"
                >
                    Welcome To <span className="text-[#60f41a]">JunkBazar</span>
                </div>
                <div className="text-2xl text-white/80">
                    Sign up to enjoy exclusive access!
                </div>
            </div>
            <div
                id="SignUpNow1"
                className="border-solid border-[rgba(102,_102,_102,_0.5)] w-2/5 h-[981px] bg-white absolute top-16 left-[1056px] flex flex-col justify-between items-start pt-16 pb-6 pl-20 border rounded-[24px]"
            >
                <div className="flex flex-col justify-between w-3/4 h-[270px] items-start">
                    <div className="flex flex-col ml-1 gap-3 w-2/5 items-start">
                        <div className="text-3xl font-['Gilroy-ExtraBold'] text-[#333333]">
                            Sign up now
                        </div>
                        <div className="text-2xl text-[#707070] ml-1">Create a new account</div>
                    </div>
                    <div className="flex flex-col gap-1 w-full items-start">
                        <div id="Label" className="text-[#666666]">
                            Phone number
                        </div>
                        <div
                            id="TextField"
                            className="border-solid border-[rgba(102,_102,_102,_0.35)] flex flex-row gap-3 w-full h-12 font-['Poppins'] items-start pt-3 px-6 border rounded-lg"
                        >
                            <div className="flex flex-row mt-0 gap-2 w-16 items-start">
                                <img
                                    src="https://file.rendit.io/n/jUM63Vw0Ucd2vmtE5cwI.svg"
                                    alt="FlagIN"
                                    id="FlagIN"
                                    className="w-10"
                                />
                                <img
                                    src="https://file.rendit.io/n/JZSJUucb3C2CX8iQ43K6.svg"
                                    alt="Icons"
                                    id="Icons"
                                    className="mt-0 w-6"
                                />
                            </div>
                            <div className="text-lg text-[#111111]">+91</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-2 gap-8 w-5/6 items-start">
                    <div className="flex flex-col gap-3 w-full font-['Sora'] items-start">
                        <div className="flex flex-row gap-2 w-full font-['Poppins'] items-start">
                            <img
                                src="https://file.rendit.io/n/wR5FonteD5TJLqgRbQs6.svg"
                                alt="CheckBox1"
                                id="CheckBox1"
                                className="w-6"
                            />
                            <div className="text-[#333333] font-['Poppins']">
                                By creating an account, I agree to our{" "}
                                <span className="underline text-[#111111]">Terms of use</span>
                                <span className="text-[#666666]"> </span>
                                <div>and</div>
                                <span className="text-[#666666]"> </span>
                                <span className="underline text-[#111111]">Privacy Policy</span>
                                <span className="underline text-[#666666]"> </span>
                            </div>
                        </div>
                        <button
                            id="Buttons"
                            className="text-center text-xl tracking-[0.16] text-white bg-[#5ab344] flex flex-row justify-center pt-6 w-full h-20 cursor-pointer items-start rounded-[68px]"
                        >
                            Continue
                        </button>
                    </div>
                    <div className="text-[#333333] ml-[175px] font-['Gilroy-Bold']">
                        Already have an account?<span> </span>
                        <span className="underline">
                            Sign in
                            {"  "}
                        </span>
                    </div>
                </div>
            </div>
            <img
                src="https://file.rendit.io/n/FoSqyEFuLaFC0c9TPlZE.png"
                alt="Tractor"
                id="Tractor"
                className="relative ml-[-350px]"
            />
        </div>

    )
}

export default VendorSign;