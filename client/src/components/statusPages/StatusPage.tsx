import SectionSelectButton from "@/components/SectionSelectButton";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import type { ReactNode } from "react";

interface Section {
    name: string;
    route: string;
    component: ReactNode;
}

interface StatusPageProps {
    basePath: string;
    sections: Section[];
}

export default function StatusPage({ basePath, sections }: StatusPageProps) {
    const [, setLocation] = useLocation();
    const [activeSection, setActiveSection] = useState<string>("");

    const [match, params] = useRoute<{ estado: string }>(`${basePath}/:estado`);
    const estadoURL = match ? params.estado : sections[0]?.route ?? "";

    useEffect(() => {
        const found = sections.find((s) => s.route === estadoURL);
        setActiveSection(found?.name ?? sections[0]?.name ?? "");
    }, [estadoURL, sections]);

    const activeComponent = useMemo(() => {
        return (
            sections.find((s) => s.name === activeSection)?.component ?? null
        );
    }, [activeSection, sections]);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-4 p-4">
                <div className="sticky top-10 flex justify-center gap-10 px-10 py-8 bg-gray-900 text-white rounded-xl w-full">
                    {sections.map(({ name, route }) => (
                        <SectionSelectButton
                            key={name}
                            sectionName={name}
                            activeSection={activeSection}
                            setActive={setActiveSection}
                            onClick={() => setLocation(`${basePath}/${route}`)}
                        />
                    ))}
                </div>
                {activeComponent}
            </div>
        </div>
    );
}
