export class SortController {
    private _currentSortField: string;
    private _sortOrder: SortOrder;

    get currentSortField(): string {
        return this._currentSortField;
    }

    get sortOrder(): SortOrder {
        return this._sortOrder;
    }

    toggleSortField(fieldName: string) {
        if (fieldName === this._currentSortField) {
            this._sortOrder = this._sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
        }
        else {
            this._currentSortField = fieldName;
            this._sortOrder = SortOrder.Ascending;
        }
    }

    sort(items: any[]) {
        items.sort((a, b) => {
            let result = 0;
            if (a[this._currentSortField] < b[this._currentSortField])
                result = -1;
            else if (a[this._currentSortField] > b[this._currentSortField])
                result = 1;
            
            return this._sortOrder === SortOrder.Ascending ? result : -result;
        });
    }
}

export enum SortOrder {
    Ascending, Descending
}
