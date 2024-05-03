import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalizeArray",
  standalone: true,
})
export class CapitalizeArrayPipe implements PipeTransform {
  transform(value: string[]): string {
    if (!value || !Array.isArray(value)) {
      return "";
    }

    return value.map((word) => this.capitalize(word)).join(", ");
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
