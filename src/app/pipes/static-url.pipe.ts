import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
/*
 * Ensures a static asset path gets the right prefix
*/
@Pipe({name: 'staticp'})
export class StaticPathPipe implements PipeTransform {
  transform(value: string): string {
    return this.getStaticPathForResource(value);
  }

    /**
   * Takes in a static resource location (ie /assets/flower.svg) and inserts an S3 bucket location if defined in the environment.
   * @static
   * @param {string} resourcePath The static resource path to translate
   * @returns The static resource path including any staticResourceRoot that should be inserted at the start of the path.
   * @memberof Helper
   */
  public getStaticPathForResource(resourcePath: string) {
    if (!resourcePath) {
      return resourcePath;
    }

    if (resourcePath.startsWith('http')) {
      return resourcePath;
    }

    return environment.staticResourceRoot + resourcePath;
  }
}

