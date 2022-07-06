import { Tab } from "@headlessui/react"
import { useEffect, useState } from "react"

export default function Index() {

    const tabs = [
        {
            title: "Best",
            type: "best"
        },
        {
            title: "New",
            type: "new"
        }
    ]

    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    const [stories, setStories] = useState({})

    const fetchStories = async (type) => {
        const res = await fetch(`/api/stories/${type}`).then(res => res.json())
        setStories({ ...stories, [`${type}`]: res })
    }

    useEffect(() => {
        const type = tabs[currentTabIndex].type
        if (!stories[type]) {
            fetchStories(type)
        }
    }, [currentTabIndex])

    return (
        <Tab.Group
            onChange={(index) => {
                setCurrentTabIndex(index)
            }}>
            <Tab.List className="flex">
                {tabs.map(tab => (
                    <Tab
                        key={tab}
                        className={({ selected }) => `w-full py-1 border-b-2 ${selected ? "outline:none focus:outline-none border-black font-medium" : "border-gray-300"}`}>{tab.title}</Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                {tabs.map((tab, index) => {
                    return (
                        <Tab.Panel>
                            {stories[tab.type] 
                            ? 
                            <div>
                                {stories[tab.type].map(story => (
                                    <div>{story.title}</div>
                                ))}
                            </div> 
                            : 
                            <div>Loading...</div>}
                        </Tab.Panel>
                    )
                })}
            </Tab.Panels>
        </Tab.Group>
    )
}