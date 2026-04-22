import React from 'react';
import { useSidebar } from '../../hooks/useSidebar';
import type { SidebarItem as SidebarItemType } from '../../../src/features/auth/types/dashboard';

interface SidebarItemProps {
    item: SidebarItemType;
    active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, active }) => {
    return (
        <div
            className={`flex items-center gap-3 px-5 py-2.5 text-[13px] cursor-pointer transition-all border-l-[3px] ${active
                ? 'bg-[#e94560]/15 text-white border-l-[#e94560]'
                : 'text-white/70 hover:bg-[#e94560]/15 hover:text-white border-l-transparent hover:border-l-[#e94560]'
                }`}
        >
            <span className="text-base">{item.icon}</span>
            {item.label}
        </div>
    );
};

const SidebarSection: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => {
    return (
        <div className="py-4">
            <div className="px-5 py-1.5 text-[10px] uppercase tracking-wider text-white/30 font-semibold">
                {label}
            </div>
            {children}
        </div>
    );
};

const SidebarFooter: React.FC = () => {
    return (
        <div className="mt-auto p-4 border-t border-white/10">
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#e94560] flex items-center justify-center font-bold text-sm text-white">
                    TA
                </div>
                <div className="text-white">
                    <p className="text-[13px] font-semibold">Tenant Admin</p>
                    <span className="text-[11px] text-white/50">admin@demo.com</span>
                </div>
            </div>
        </div>
    );
};

const Sidebar: React.FC = () => {
    const { data, loading } = useSidebar();

    return (
        <div className="w-[240px] bg-[#1a1a2e] text-white flex flex-col fixed h-screen overflow-y-auto">
            <div className="p-6 border-bottom border-white/10">
                <h2 className="text-lg font-bold text-[#e94560]">🏪 POSPlatform</h2>
                <p className="text-[11px] text-white/50 mt-0.5">Back Office Management</p>
            </div>

            <div className="flex-1">
                {loading ? (
                    <div className="p-5 text-white/50 text-xs">Loading menu...</div>
                ) : (
                    data?.sections.map((section, idx) => (
                        <SidebarSection key={idx} label={section.label}>
                            {section.items.map((item, itemIdx) => (
                                <SidebarItem
                                    key={itemIdx}
                                    item={item}
                                    active={item.path === '/dashboard'}
                                />
                            ))}
                        </SidebarSection>
                    ))
                )}
            </div>

            <SidebarFooter />
        </div>
    );
};

export default Sidebar;
