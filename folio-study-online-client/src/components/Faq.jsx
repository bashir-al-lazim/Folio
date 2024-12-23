/* eslint-disable react/no-unescaped-entities */
const Faq = () => {
    return (
        <div className="resize px-10 pb-32">
            <div className="grid">
                <p className="p-2 text-sm font-medium tracking-wider text-right uppercase">How it works</p>
                <h2 className="font-bold leading-[5rem] text-right text-6xl text-yellow-400">Frequently <br /> Asked Questions</h2>
                <img src="https://i.ibb.co/NpWbPTw/faq.png" alt="" className="justify-self-end w-full" />
            </div>
            <div className="space-y-5">
                <div className="collapse collapse-plus border-r-[0.25rem] border-b-[0.25rem] border-yellow-400 hover:border-black box-shadow-yellow transition duration-500">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-2xl font-medium">
                        Is the service totally free?
                    </div>
                    <div className="collapse-content">
                        <p>Yes! Don't worry, everything is free of cost here. We only want contribution and hard-work from you.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus border-r-[0.25rem] border-b-[0.25rem] border-yellow-400 hover:border-black box-shadow-yellow transition duration-500">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-2xl font-medium">
                    How do I create an assignment?
                    </div>
                    <div className="collapse-content">
                        <p>To create an assignment, navigate to the "Create Assignment" section, fill in the required details such as title, description, and due date, attach any necessary files, and assign tasks to group members.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus border-r-[0.25rem] border-b-[0.25rem] border-yellow-400 hover:border-black box-shadow-yellow transition duration-500">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-2xl font-medium">
                    How do I submit an assignment?
                    </div>
                    <div className="collapse-content">
                        <p>To submit an assignment, go to the assignment page, click on the assignment you want to submit, and then click the "Submit" button. Upload your assignment file and any additional comments if required.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus border-r-[0.25rem] border-b-[0.25rem] border-yellow-400 hover:border-black box-shadow-yellow transition duration-500">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-2xl font-medium">
                    Can I access the website and submit assignments offline?
                    </div>
                    <div className="collapse-content">
                        <p>No, you need an internet connection to access the website and submit assignments. However, you can work on your assignments offline and then submit them when you regain internet access.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus border-r-[0.25rem] border-b-[0.25rem] border-yellow-400 hover:border-black box-shadow-yellow transition duration-500">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-2xl font-medium">
                    Is there a mobile app available for easier access?
                    </div>
                    <div className="collapse-content">
                        <p>Currently, we don't have a dedicated mobile app, but our website is fully responsive, allowing you to access and use all features seamlessly on any device, including smartphones and tablets.</p>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};

export default Faq;