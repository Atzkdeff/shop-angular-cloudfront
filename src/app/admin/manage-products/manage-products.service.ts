import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap(({ uploadUrl }) =>
        this.http.put(uploadUrl, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        }),
      ),
    );
  }

  private getPreSignedUrl(
    fileName: string,
  ): Observable<{ key: string; uploadUrl: string }> {
    const url = this.getUrl('import', 'import');
    const authorizationToken = localStorage.getItem('authorization_token');

    return this.http.get<{ key: string; uploadUrl: string }>(url, {
      params: {
        name: fileName,
      },
      headers: {
        Authorization: `Basic ${authorizationToken}`,
      },
    });
  }
}
