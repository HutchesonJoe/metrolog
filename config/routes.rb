Rails.application.routes.draw do
  
    resources :tenants, only: [:index]
    resources :supers, only: [:index]
    resources :complaints, only: [:index]
    resources :apartments, only: [:index]
    resources :buildings, only: [:index]
    resources :tenant_complaints, only: [:index]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
