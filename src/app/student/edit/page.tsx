import { api } from "@/trpc/server";

const bloodTypes = ["A", "B", "AB", "O"] as const;

type BloodType = (typeof bloodTypes)[number];

export default async function Students() {

    const data = await api.student.getMiscInfo();

    async function submit(formData: FormData) {
        "use server";
        const bloodType = formData.get("bloodType") as string;

        const departmentId = parseInt(formData.get("departmentId") as string);

        const me = await api.student.me();
        if (!me) {
            return;
        }

        if (!isBloodType(bloodType)) {
            return;
        }
        
        await api.student.update({
            id: me.id,
            bloodType,
            departmentId,
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <form>
                <div className="flex flex-col gap-2">
                    <select className="text-black" name="bloodType">
                        {bloodTypes.map(x => <option className="text-black" value={x}>{x}</option>)}
                    </select>
                    <select className="text-black" name="departmentId">
                        {data.engineeringDepartments.map(x => <option className="text-black" value={x.id}>{x.nameEn}</option>)}
                    </select>
                    <button className="p-2 hover:scale-110 bg-orange-400 rounded-xl" formAction={submit}>Submit</button>
                </div>
            </form>
        </main>
    );
}

function isBloodType(bloodType: string): bloodType is BloodType {
    return (bloodTypes as readonly string[]).includes(bloodType);
}
