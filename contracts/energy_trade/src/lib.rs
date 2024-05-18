#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Trade,
}

#[derive(Clone)]
#[contracttype]
pub struct Trade {
    seller: Address,
    buyer: Address,
    energy_amount: u32,
    amount: i128,
    completed: bool,
}

#[contract]
pub struct EnergyTrade;

#[contractimpl]
impl EnergyTrade {
    pub fn create_trade(env: Env, seller: Address, buyer: Address, energy_amount: u32, amount: i128) {

        seller.require_auth();
        write_trade(
            &env,
            &Trade {
                seller,
                buyer,
                energy_amount,
                amount,
                completed: false,
            },
        );
    }

    pub fn complete_trade(env: Env, buyer: Address) {
        buyer.require_auth();

        let mut trade = get_trade(&env);
        let buyer_token_client = token::Client::new(&env, &buyer);

        let contract = env.current_contract_address();

        buyer_token_client.transfer(&buyer, &contract, &trade.amount);

        trade.completed = true;

        env.storage().instance().set(&DataKey::Trade, &trade);

    }

    pub fn withdraw(env: Env, amount: i128) {
        let trade = get_trade(&env);
        trade.seller.require_auth();
        token::Client::new(&env, &env.current_contract_address()).transfer(&env.current_contract_address(), &trade.seller, &amount)
        }
}

fn get_trade(env: &Env) -> Trade{
    env.storage().instance().get(&DataKey::Trade).unwrap()
}

fn write_trade(env: &Env, trade: &Trade) {
    env.storage().instance().set(&DataKey::Trade, trade);
}