import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompanyBoarding() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Company Name</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="picture">Logo</Label>
          </div>
          <Input id="picture" type="file" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Industry</Label>
          </div>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Address </Label>
          </div>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
}
