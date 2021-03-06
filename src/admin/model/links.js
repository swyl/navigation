'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getPage(num = 1, listRows = 20) {
        //查询第 1 页数据，每页 10 条数据
        let id = this.getTableName() + '.id';

        return this.page(num, listRows).countSelect();
    }

    getList(num = 1) {
        this.field([this.getTableName() + '.*', this.getTablePrefix() + 'catalog.catalog_name as catalog_name']).join({
            table: 'catalog',
            join: 'left',
            on: ['catalog_id', 'id']
        });

        return this.getPage(num);
    }

    showSatus(num) {
        let status = this.getTableName() + '.status_is';
        this.where({[status]: 'Y'})
        return this.getList(num);
    }

    getSingleList(data) {
        let id, _data = {};

        for (let key in data) {
            if (key == 'id') {
                id = this.getTableName() + '.id';
                _data[id] = data[key];
            } else {
                _data[key] = data[key];
            }
        }

        return this.field([this.getTableName() + '.*', this.getTablePrefix() + 'catalog.id as catalog_id']).join({
            table: 'catalog',
            join: 'left',
            on: ['catalog_id', 'id']
        }).where(_data).find();
    }

    searchTitleList(keywords, page) {
        this.field([this.getTableName() + '.*', this.getTablePrefix() + 'catalog.catalog_name as catalog_name']).join({
            table: 'catalog',
            join: 'left',
            on: ['catalog_id', 'id']
        });

        this.where({'title': ["like", "%" + keywords + "%"]});

        return this.getPage(page);
    }

    searchStatusList(keywords, page) {
        this.field([this.getTableName() + '.*', this.getTablePrefix() + 'catalog.catalog_name as catalog_name']).join({
            table: 'catalog',
            join: 'left',
            on: ['catalog_id', 'id']
        });

        this.where({[this.getTableName() + '.status_is']: 'N'});

        return this.getPage(page);
    }

    searchCategoryList(keywords, page) {
        this.field([this.getTableName() + '.*', this.getTablePrefix() + 'catalog.catalog_name as catalog_name']).join({
            table: 'catalog',
            join: 'left',
            on: ['catalog_id', 'id']
        });


        this.where({catalog_name: ["like", "%" + keywords + "%"]});


        return this.getPage(page);
    }
}