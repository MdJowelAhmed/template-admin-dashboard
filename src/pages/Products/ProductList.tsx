import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  SearchInput,
  FilterDropdown,
  DataTable,
  Pagination,
  StatusBadge,
} from '@/components/common'
import { ProductActionMenu } from './components/ProductActionMenu'
import { AddEditProductModal } from './AddEditProductModal'
import { DeleteProductModal } from './DeleteProductModal'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setFilters, setPage, setLimit, setSelectedProduct } from '@/redux/slices/productSlice'
import { PRODUCT_STATUSES } from '@/utils/constants'
import { formatCurrency, formatDate } from '@/utils/formatters'
import type { Product, TableColumn } from '@/types'
import { motion } from 'framer-motion'

export default function ProductList() {
  const dispatch = useAppDispatch()
  const { filteredList, filters, pagination, isLoading, selectedProduct } = useAppSelector(
    (state) => state.products
  )
  const { list: categories } = useAppSelector((state) => state.categories)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: 'All Categories' },
      ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
    ],
    [categories]
  )

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        key: 'product',
        label: 'Product',
        sortable: true,
        render: (_, product) => (
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'category',
        label: 'Category',
        sortable: true,
        render: (value) => (
          <span className="text-muted-foreground">{value as string}</span>
        ),
      },
      {
        key: 'price',
        label: 'Price',
        sortable: true,
        render: (value) => (
          <span className="font-medium">{formatCurrency(value as number)}</span>
        ),
      },
      {
        key: 'stock',
        label: 'Stock',
        sortable: true,
        render: (value) => {
          const stock = value as number
          return (
            <span
              className={
                stock === 0
                  ? 'text-destructive font-medium'
                  : stock < 20
                  ? 'text-warning font-medium'
                  : 'text-muted-foreground'
              }
            >
              {stock} units
            </span>
          )
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (value) => <StatusBadge status={value as string} />,
      },
      {
        key: 'updatedAt',
        label: 'Last Updated',
        sortable: true,
        render: (value) => (
          <span className="text-muted-foreground">{formatDate(value as string)}</span>
        ),
      },
    ],
    []
  )

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    return filteredList.slice(start, end)
  }, [filteredList, pagination.page, pagination.limit])

  const handleSearch = (search: string) => {
    dispatch(setFilters({ search }))
  }

  const handleStatusFilter = (status: string) => {
    dispatch(setFilters({ status: status as Product['status'] | 'all' }))
  }

  const handleCategoryFilter = (categoryId: string) => {
    dispatch(setFilters({ categoryId }))
  }

  const handleEdit = (product: Product) => {
    dispatch(setSelectedProduct(product))
    setShowEditModal(true)
  }

  const handleDelete = (product: Product) => {
    dispatch(setSelectedProduct(product))
    setShowDeleteModal(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Products</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your product catalog with ease
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchInput
              value={filters.search}
              onChange={handleSearch}
              placeholder="Search by name, SKU..."
              className="sm:w-80"
            />
            <div className="flex gap-3 flex-wrap">
              <FilterDropdown
                value={filters.status}
                options={PRODUCT_STATUSES}
                onChange={handleStatusFilter}
                placeholder="All Status"
              />
              <FilterDropdown
                value={filters.categoryId}
                options={categoryOptions}
                onChange={handleCategoryFilter}
                placeholder="All Categories"
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={paginatedData}
            isLoading={isLoading}
            rowKeyExtractor={(row) => row.id}
            actions={(product) => (
              <ProductActionMenu
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product)}
              />
            )}
            emptyMessage="No products found. Try adjusting your filters."
          />

          {/* Pagination */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            onPageChange={(page) => dispatch(setPage(page))}
            onItemsPerPageChange={(limit) => dispatch(setLimit(limit))}
          />
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <AddEditProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
      />

      {/* Edit Product Modal */}
      {selectedProduct && (
        <AddEditProductModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            dispatch(setSelectedProduct(null))
          }}
          mode="edit"
          product={selectedProduct}
        />
      )}

      {/* Delete Product Modal */}
      {selectedProduct && (
        <DeleteProductModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false)
            dispatch(setSelectedProduct(null))
          }}
          product={selectedProduct}
        />
      )}
    </motion.div>
  )
}

