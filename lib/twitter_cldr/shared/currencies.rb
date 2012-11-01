# encoding: UTF-8

# Copyright 2012 Twitter, Inc
# http://www.apache.org/licenses/LICENSE-2.0

module TwitterCldr
  module Shared
    module Currencies
      class << self
        def countries
          resource_countries.keys.map(&:to_s)
        end

        def currency_codes(locale = :en)
          resource(locale).keys.map{|c| c.to_s}
        end

        def for_country(country_name, locale = :en)
          return nil if !resource_countries[country_name.to_sym]
          for_code(resource_countries[country_name.to_sym][:code], locale)
        end

        def for_code(currency_code, locale = :en)
          currency_code = currency_code.to_sym
          data = resource(locale)[currency_code]
          { :currency => currency_code,
            :name => data[:name],
            :symbol => data[:symbol] } if data
        end

        private

        def resource_countries
          @resource_countries ||= TwitterCldr.get_resource(:shared, :currencies)
        end

        def resource(locale)
          locale = locale.to_sym
          @resource ||= {}
          return @resource[locale] if @resource[locale]

          fallbacks = locale.to_s.split("_").inject([]) do |list, t|
            list.push((list.length == 0) ? t : "#{list.last}_#{t}")
          end.reverse

          fallbacks.push("root")

          @resource[locale] = {}

          fallbacks.each do |l|
            r = TwitterCldr.get_resource(:locales, l, :currencies)
            r.each_pair do |code, data|
              @resource[locale][code] ||= {}
              data.each_pair do |k, v|
                @resource[locale][code][k] ||= v
              end
            end
          end

          @resource[locale]
        end
      end
    end
  end
end
