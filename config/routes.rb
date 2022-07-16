Rails.application.routes.draw do
  
    resources :tenants, only: [:index, :create]
    resources :supers, only: [:index, :create]
    resources :complaints, only: [:index]
    resources :apartments, only: [:index, :create]
    resources :buildings, only: [:index]
    resources :tenant_complaints, only: [:index]

    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "/me", to: "sessions#show"
    # get "/tenant/me", to: "tenants#show"
    # get "/super/me", to: "supers#show"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
