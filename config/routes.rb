Rails.application.routes.draw do
  
    resources :tenants, only: [:index, :create]
    resources :supers, only: [:index, :create]
    resources :complaints, only: [:index]
    resources :apartments, only: [:index, :create]
    resources :buildings, only: [:index]
    #full crud??
    resources :tenant_complaints, only: [:index, :show, :update, :create, :destroy]

    get "/by-date", to: "tenant_complaints#order_by_date"
    get "/open-complaints", to: "tenant_complaints#get_open"
    get "/closed-complaints", to: "tenant_complaints#get_closed"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "/me", to: "sessions#show"
    # get "/tenant/me", to: "tenants#show"
    # get "/super/me", to: "supers#show"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
