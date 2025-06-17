import {Icons} from "@/components/layout/loading/icons";


export default function LoadingComponent() {

    return (
        <div className="flex items-center justify-center">
            <Icons.spinner className="h-16 w-16 animate-spin" />
        </div>
    );
}
