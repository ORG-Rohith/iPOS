
// import CreateBusinessOwnerLayout from "./CreateBusinessOwnerLayout";
// import Breadcrumbs from "../../../shared/components/ui/Breadcrumbs";
// import { useCreateBusinessOwner } from "./useCreateBusinessOwner";
// import CreateBusinessOwnerForm from "./CreateBusinessOwnerForm";

// export const CreateBusinessOwnerPage: React.FC = () => {

//     const { createBusinessOwner, loading, error } = useCreateBusinessOwner();
//     const breadcrumbItems = [
//         { label: "Home", path: "/dashboard" },
//         { label: "Business Owners", path: "/businessOwners" },
//         { label: "Create Business Owner" },
//     ];
//     // const navigate = useNavigate();
//     // const [loading, setLoading] = useState(false);
//     // const [error, setError] = useState<string | null>(null);

//     // const [form, setForm] = useState<Partial<BusinessOwner> & { subscriptions: any[] }>({
//     //     name: "",
//     //     email: "",
//     //     phone: "",
//     //     status: "Active" as const,
//     //     subscriptions: []
//     // });

//     // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     //     const { name, value } = e.target;
//     //     setForm((prev) => ({ ...prev, [name]: value }));
//     // };

//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     setError(null);

//     //     try {
//     //         await businessOwnerService.createBusinessOwner(form);
//     //         navigate("/businessOwners");
//     //     } catch (err: any) {
//     //         setError(err.message || "Failed to create business owner");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     return (
//         <CreateBusinessOwnerLayout title="Create Business Owner">
//             <div className="max-w-7xl mx-auto">
//                 <Breadcrumbs items={breadcrumbItems} />

//                 {error && (
//                     <div className="mx-7 mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
//                         <span className="text-xl">⚠️</span>
//                         <p className="text-sm font-medium">{error}</p>
//                     </div>
//                 )}

//                 <div className="p-7">
//                     <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
//                         <CreateBusinessOwnerForm onSubmit={createBusinessOwner} />
//                     </div>
//                     {loading && (
//                         <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             {/* {error && (
//                 <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
//                     {error}
//                 </div>
//             )}

//             <BusinessOwnerForm
//                 form={form}
//                 setForm={setForm}
//                 handleChange={handleChange}
//                 onSubmit={handleSubmit}
//                 loading={loading}
//             /> */}
//         </CreateBusinessOwnerLayout >
//     );
// };



// pages/CreateBusinessOwnerPage.tsx

import Breadcrumbs from "../../../shared/components/ui/Breadcrumbs";
import CreateBusinessOwnerForm from "./CreateBusinessOwnerForm";
import CreateBusinessOwnerLayout from "./CreateBusinessOwnerLayout";
import { useCreateBusinessOwner } from "./useCreateBusinessOwner";




export const CreateBusinessOwnerPage: React.FC = () => {
    const {
        createBusinessOwner,
        loading,
        error,
    } = useCreateBusinessOwner();

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/dashboard",
        },
        {
            label: "Business Owners",
            path: "/businessOwners",
        },
        {
            label: "Create Business Owner",
        },
    ];

    return (
        <CreateBusinessOwnerLayout title="Create Business Owner">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                {error && (
                    <div className="mx-7 mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                        <span className="text-xl">
                            ⚠️
                        </span>

                        <p className="text-sm font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <div className="p-7">
                    <div
                        className={
                            loading
                                ? "opacity-50 pointer-events-none transition-opacity"
                                : ""
                        }
                    >
                        <CreateBusinessOwnerForm
                            onSubmit={createBusinessOwner} loading={false} />
                    </div>

                    {loading && (
                        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                    )}
                </div>
            </div>
        </CreateBusinessOwnerLayout>
    );
};